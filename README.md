# gitter-log

TPS Reports via Gitter

I use this to extract the contents of a specific Gitter room into a Markdown document consisting of a bunch of timestamped messages. I then use this to generate a TPS report for various projects I'm involved with. Other folks might find it handy for similar purposes, or may use it create a readable digest of a Gitter room.

## Installation

### Install NodeJS dependencies

Begin by installing any NodeJS modules. Currently the only NodeJS dependency is the [gitter-export-room]() command, which deals with using the Gitter client API to access the desired Room's data.

### Install `jq`

This code currently relies upon the [jq](https://stedolan.github.io/jq/) tool, which this `npm` project does not currently install. So you will need to install `jq`. If you are using Homebrew, then the following will suffice:

```bash
brew install jq
```

*Note: I may abandon the use of `jq` in favor of plain-old NodeJS, to simplify the installation and documentation.*


## Configuration

The Gitter API requires a user-authentication token to access your potentially private Gitter data. The `gitter-export-room` tool we use can accept this token on the command line, but that is a security vulnerability. So instead, we set the environment variable `GITTER_TOKEN`, which is used by `gitter-export-room` to access Gitter securely.

You will need to create a file `./secret/config.sh` that will look something like this:

```bash
export GITTER_TOKEN=YourGitterAPITokenHere
export GITTER_ROOM=YourGitterRoomIdHere
export JSON_OUTPUT=mylog.json
export MD_OUTPUT=mylog.md
```

I've provided an example in `./secret/example-config.sh` which you can copy into your `./secret/config.sh`.

You will replace the `GITTER_TOKEN` value with an API key you generate via [Gitter Developer](https://developer.gitter.im/apps) site. Save your `./secret/config.sh` file and run the following command:

```bash
npm run list
```

The above command should list your Gitter rooms and their `id` numbers. Copy the desired room's `id` number and use it for the `GITTER_ROOM` value in `./secret/config.sh`. Save the `./secret/config.sh` and you should be able to generate logs.


## Usage

The typical usage is to run `npm run logmd` to generate a crudely formatted Markdown file based upon each Gitter message's `sent` timestamp and `text` content. This file will be created using the filename in `MD_OUTPUT`.

In theory, you could run `npm run log` to generate the raw JSON from `gitter-export-room`, and use your own tooling or `jq` to postprocess the JSON.

In both cases, the `JSON_OUTPUT` value will be used to store the JSON produced from `gitter-export-room`.


## ToDo

- Eliminate use of `jq`, as it is unnecessarily powerful and cannot be installed (easily) via `npm`. Consider the use of [jq.node](https://github.com/FGRibreau/jq.node).
- Eliminate the detailed timestamp in favor of something more readable.
- Eliminate the need for intermediate files, which is mostly due to the fact that I don't want to have to run `npm run --silent` to keep `npm` from polluting `/dev/stdout`.
- Allow for injection into a Markdown *template* (e.g., a TPS Report Template).
- Support an easier way other than the `config.sh` to specify parameters, while still keeping the secrets secret.
- Allow for multiple rooms to be queried and assembled into a time-ordered or room-ordered document.
- Allow for a time-window parameter, so that only the last week (for example) of messages would be extracted.
