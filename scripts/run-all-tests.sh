#!/usr/bin/env bash

function set_bash_fail_on_error() {
  set -o errexit
  set -o errtrace
  set -o nounset
  set -o pipefail
}

function go_to_root_directory() {
  root_directory=$(git rev-parse --show-toplevel)
  cd "$root_directory"
}

function check_scripts() {
  shellcheck scripts/*.sh
}

function fail_for_unstaged_files() {
  local -r unstaged_files_count=$(git status --porcelain | wc -l)
  local -r trimmed_unstaged_files_count=$(echo -e -n "$unstaged_files_count" | tr -d ' ')
  if [ "$trimmed_unstaged_files_count" != "0" ]; then
    local -r unstaged_files=$(git status --porcelain)
    local -r RED_COLOR_CODE='\033[0;31m'
    echo -e "${RED_COLOR_CODE}\nERROR!\\nUnstaged and/or uncommitted files found! Please clean these up and try again:\\n${unstaged_files}"
    exit
  fi
}

function lint() {

  yarn run lint
}

function run_unit_tests() {
  yarn run test --watchAll=false
}

function stop_app_if_already_running() {
  shut_down_app
}

function start_app() {
  stop_app_if_already_running
  npx pm2 start yarn --interpreter bash --name daily-harvest-interview -- start
}

function wait_for_app_to_start() {
  while ! echo exit | nc localhost 3000; do sleep 10; done
}

function e2e_tests() {
  start_app
  wait_for_app_to_start

  local -r RED_COLOR_CODE='\033[0;31m'
  local -r WHITE_COLOR_CODE='\033[0;37m'
  local -r GREEN_COLOR_CODE='\033[0;32m'

  yarn run cypress-run || {
    echo -e "${RED_COLOR_CODE}\\nEnd to end tests failed... \\nExiting!${WHITE_COLOR_CODE}" && shut_down_app >&2
    exit 1
  }
  echo -e "${GREEN_COLOR_CODE}\\nEnd to end tests successful! \\nExiting${WHITE_COLOR_CODE}"

  shut_down_app
}

function shut_down_app() {
  npx pm2 stop daily-harvest-interview
  npx pm2 delete daily-harvest-interview
}

function display_success_message() {
  local -r GREEN_COLOR_CODE='\033[0;32m'
  echo -e  "${GREEN_COLOR_CODE}\\n$(cat scripts/success_ascii_art.txt)"
}

function main() {
  go_to_root_directory

  set_bash_fail_on_error

  check_scripts
  fail_for_unstaged_files

  lint

  run_unit_tests
  e2e_tests

  display_success_message
}

main "$@"