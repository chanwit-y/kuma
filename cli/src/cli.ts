#!/usr/bin/env ts-node

import { Command } from 'commander';

const program = new Command();

program
  .version('0.1.0')
  .description('My CLI tool')
  .option('-f, --file <file>', 'specify the input file')
  .option('-o, --output <file>', 'specify the output file')
  .option('-v, --verbose', 'show verbose output')
  .command('say-hello <name>')
  .description('say hello to someone')
  .action((name) => {
    console.log(`Hello, ${name}!`);
  });

program.parse(process.argv);