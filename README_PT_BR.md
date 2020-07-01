# crowdin-updater

Uma ação flexível que atualiza outro repositório com base nas modificações atuais.

## Inspiração

Projetos que utilizam Crowdin para localizar seu serviço, costumam criar um repositório para guardar e sincronizar os arquivos necessários.
Porém em todos os casos a atualização do mesmo teria que ser manualmente e isso é chato e muito trabalhoso para projetos grandes. Foi aí que despertou a ideia de criar um fluxo simples, fácil de configurar, e que entrega o que promete.

### Limitações

- Não faz a mesclagem de chave SSH na máquina em execução.
- Só filtra arquivos JSON `.json` (flexível em atualizações futuras).

## Modo de Uso

Como dito acima esta ação não mescla uma chave SSH para fazer ações requiridas como PUSH/CLONE, visto por um lado isto pode ser um problema mas por outro você pode usar outra ação de sua escolha para fazer isso, por exemplo **[webfactory/ssh-agent](https://github.com/webfactory/ssh-agent)** que será usado como exemplo logo adiante.

```yaml
- name: Set SSH Key
  uses: webfactory/ssh-agent@v0.2.0
  with:
    ssh-private-key: ${{ secrets.SSH_TOKEN }}

- uses: pablo1v/crowdin-updater@master
  with:
    # Repositório para qual será enviada as novas atualizações
    # Usar SSH Link para repositório privado
    # Obrigatório
    target-repository: ''

    # Diretório onde os arquivos de traduções estão alocados
    # Obrigatório
    locale-path: ''

    # Diretório onde os arquivos de traduções será enviado e atualizado
    # Obrigatório
    upload-path: ''
    # Diretório onde as traduções será enviada e atualizada
    # Obrigatório

    # Mensagem que será vinculada ao commit
    # Padrão: Upload Translates
    commit-message: ''

    # Nome que será vinculado ao commit
    # Padrão: TranslateAction
    user-name: ''

    # E-mail que será vinculado ao commit
    # Padrão: translate@action.github
    user-email: ''
```

## Licença

AGPL 3.0 - Verificar [Arquivo de Licença](https://github.com/pablo1v/crowdin-updater/blob/master/LICENSE)
