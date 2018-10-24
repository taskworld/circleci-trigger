#!/usr/bin/env node
const axios = require('axios')
const argv = require('yargs')
  .option('p', {
    alias: 'project',
    demandOption: true,
    describe: 'Project identifier (github/username/repo)',
    type: 'string'
  })
  .option('k', {
    alias: 'key',
    demandOption: true,
    describe: 'CircleCI API key',
    type: 'string'
  })
  .option('b', {
    alias: 'branch',
    demandOption: true,
    describe: 'Branch to build',
    type: 'string'
  })
  .option('c', {
    alias: 'commit',
    describe: 'Commit SHA to build',
    type: 'string'
  })
  .option('j', {
    alias: 'job',
    describe: 'CircleCI job to build',
    type: 'string'
  })
  .parse()

process.on('unhandledRejection', up => {
  throw up
})

async function main() {
  const payload = {
    build_parameters: {}
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
      { auth: { username: argv.key, password: '' } }
    )
    console.log(response.data.build_url)
  } catch (e) {
    if (e.response) {
      console.error('Error response received:', e.response.data)
    }
    throw e
  }
}

main()
