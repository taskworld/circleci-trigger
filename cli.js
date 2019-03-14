#!/usr/bin/env node
const config = require('cosmiconfig')('circleci-trigger').searchSync()
const axios = require('axios')
const defaultToken = config && config.config.circleciToken

process.on('unhandledRejection', up => {
  throw up
})

async function main(argv) {
  const payload = {
    build_parameters: {},
  }
  if (argv.job) {
    payload.build_parameters.CIRCLE_JOB = argv.job
  }
  if (argv.c) {
    payload.revision = argv.commit
  }
  try {
    const project = argv.project
    const branch = argv.branch
    const response = await axios.post(
      `https://circleci.com/api/v1.1/project/${project}/tree/${branch}`,
      payload,
      { auth: { username: argv.key || defaultToken, password: '' } }
    )
    console.log(response.data.build_url)
  } catch (e) {
    if (e.response) {
      console.error('Error response received:', e.response.data)
    }
    throw e
  }
}

require('yargs')
  .command(
    '$0',
    'Triggers a CircleCI build',
    {
      p: {
        alias: 'project',
        demandOption: true,
        describe: 'Project identifier (github/<username>/<repo>)',
        type: 'string',
      },
      t: {
        alias: ['token', 'k', 'key'],
        demandOption: !defaultToken,
        describe: 'CircleCI API token',
        type: 'string',
      },
      b: {
        alias: 'branch',
        demandOption: true,
        describe: 'Branch to build',
        type: 'string',
      },
      c: {
        alias: 'commit',
        describe: 'Commit SHA to build',
        type: 'string',
      },
      j: {
        alias: 'job',
        describe: 'CircleCI job to build',
        type: 'string',
      },
    },
    main
  )
  .strict()
  .help()
  .parse()
