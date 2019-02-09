#!/usr/bin/env bash
jq -r '.[] | ["## " + .sent + "\n" + .text + "\n" ] | @tsv' | sed 's/\\n/\
/g' > ${1:-/dev/stdout}
