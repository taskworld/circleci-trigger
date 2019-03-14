# circleci-trigger

Simple script to trigger a CircleCI build...

```sh
npx circleci-trigger \
  -p github/<user>/<repo> \
  -b <branch> \
  -k <api-token> \
  -j <CIRCLE_JOB>
```

After running the script, the build URL will be printed out.

## Configuration (optional)

All configuration can be set via the command line parameter. To avoid having to spell out the API key every time, you can create a file `~/.circleci-triggerrc.json` with the API key:

```json
{
  "circleciToken": "YOUR_TOKEN_HERE"
}
```
