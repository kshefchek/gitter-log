#!/usr/bin/env node

//
// Usage: ./postprocess.js
//


// id
// text
// html
// sent
// fromUser
// unread
// readBy
// urls
// mentions
// issues
// meta
// v

// const aliasMap = {
//   'Kent': '@kshefchek',
//   'Deepak': '@deepakunni3',
//   'Tom': '@TomConlin',
// };


const fs = require('fs');

function applyAliases(aliasMap, text) {
  let result = text;
  Object.keys(aliasMap).forEach(key => {
    const reString = `(\\W)${key}(\\W)`;
    result = result.replace(new RegExp(reString, 'g'), '$1' + aliasMap[key] + '$2');
  });

  return result;
}

const aliasesInput = fs.readFileSync(process.env.ALIASES, 'utf-8');
const aliasesJSON = JSON.parse(aliasesInput);

const input = fs.readFileSync('/dev/stdin', 'utf-8');
const inputJSON = JSON.parse(input);

inputJSON.forEach(row => {
  const text = row.text
                .replace(/\\n/g, '\n')
                .replace(/:\n- /g, ':\n\n- ');
  const aliasedText = applyAliases(aliasesJSON, text);

  const date = new Date(row.sent);
  const timestamp = date.toLocaleString(
    'en-US',
    {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  const rowHeader = `#### ${timestamp} @${row.fromUser.username}\n\n`;
  const rowBody =`${aliasedText}\n\n`;
  const rowOut = `${rowHeader}${rowBody}`;
  process.stdout.write(rowOut);
});


