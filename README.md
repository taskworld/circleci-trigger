# circleci-trigger

CircleCI 2.0 comes with a feature that allows you to set multiple jobs for your CI workflow, but sometimes you want to trigger a certain job manually. This is CLI application helps you do that.

## Usage

1. Go to CircleCI project settings, go to API permissions and obtain an API token.

2. Run the following command:

    ```sh
    npx circleci-trigger \
      -p github/<user>/<repo> \
      -b <branch> \
      -k <apikey> \
      -j <CIRCLE_JOB>
    ```
