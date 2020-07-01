# crowdin-action

A flexible action that updates another repository based on current modifications.

## Inspiration

Projects that use Crowdin to locate their service, usually create a repository to store and synchronize the necessary files.
However, in all cases, updating it would have to be done manually and this is boring and very laborious for large projects. It was there that the idea of ​​creating a simple flow, easy to set up, and that delivers what it promises was sparked.

### Limitations

- Do not merge the SSH key on the running machine.
- Only filters JSON `.json` files (flexible in future updates).

## Usage

As stated above, this action does not merge an SSH key to perform required actions such as PUSH/CLONE, since on the one hand this can be a problem but on the other hand you can use another action of your choice to do this, for example **[webfactory/ssh-agent](https://github.com/webfactory/ssh-agent)** which will be used as an example below.

```yaml
- name: Set SSH Key
  uses: webfactory/ssh-agent@v0.2.0
  with:
    ssh-private-key: ${{ secrets.SSH_TOKEN }}

- uses: pablo1v/crowdin-action@master
  with:
    # Repository to which updates will be sent
    # Use SSH Link for private repository
    # Required
    target-repository: ''

    # Directory where the translation files are allocated
    # Required
    locale-path: ''

    # Directory where the translation files will be sent and updated
    # Required
    upload-path: ''

    # Message that will be linked to the commit
    # Default: Upload Translates
    commit-message: ''

    # Name that will be linked to the commit
    # Default: TranslateAction
    user-name: ''

    # Email that will be linked to the commit
    # Default: translate@action.github
    user-email: ''
```

## License

AGPL 3.0 - Check [License File](https://github.com/pablo1v/crowdin-action/blob/master/LICENSE)
