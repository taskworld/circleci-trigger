# circleci-trigger

CircleCI 2.0 comes with a feature that allows you to set multiple jobs for your CI workflow, but sometimes you want to trigger a certain job manually. This is CLI application helps you do that.

## Usage

1. Go to CircleCI project settings, go to API permissions and obtain an API token.

2. Run the following command:

   ```sh
   npx circleci-trigger \
     -p github/<user>/<repo> \
     -b <branch> \
     -t <api-token> \
     -j <CIRCLE_JOB>
   ```

After running the script, the build URL will be printed out.

## Configuration (optional)

All configuration can be set via the command line parameter. But to avoid putting API tokens in the command line, you can create a file `~/.circleci-triggerrc.json` with the API token:

```json
{
  "circleciToken": "YOUR_TOKEN_HERE"
}
```
