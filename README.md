# People App

Aplicativo mobile desenvolvido com React Native e TypeScript que permite explorar, visualizar dados e enviar mensagens para uma lista de usuários utilizando a API RandomUser.

## Overview

- Lista de Usuários com paginação infinita
- Pull-to-refresh para recarregar a página
- Botão de Filtro de Usuários
- Barra de Pesquisa por nome
- Cards com navegação para perfil detalhado
- Perfil com informações do Usuário
- Chat com envio de mensagens e persistência local de dados

## Tecnologias Utilizadas

- React Native
- Expo (SDK 50+)
- TypeScript
- React Navigation
- RandomUser API

## Como rodar o projeto

### Pré-requisitos

- Node.js
- Git
- Aplicativo Expo Go para Android ou iOS

### 1. Clone o repositório

Abra o terminal e execute:

`git clone https://github.com/erivanpaiva/people-app`

### 2. Instale as dependências

Entre na pasta do projeto e execute o comando para instalar as bibliotecas necessárias:

```cd people-app
npm install
```

### 3. Execute o projeto

Ainda na pasta do projeto, use o comando para iniciá-lo no Expo Go:

`npx expo start`

### 4. Visualize no Celular

Ao rodar, o Expo vai gerar um QR Code, baixe o aplicativo Expo Go em seu celular e aponte sua câmera para o QR Code gerado que abrirá o app automaticamente.

## Decisões Técnicas

### - Listagem de Dados

A FlatList foi utilizada para renderizar a lista de usuários de forma eficiente para garantir uma melhor performance, visto se tratar de um grande volume de dados com paginação infinita.

### - Filtros

Foram implementados dois filtros em um modal com parâmetros disponíveis na RandomUser API, os filtros foram escolhidos visando a diversidade de características dos dados da API.

### - Campo de Busca

Um campo de busca simples também foi implementado a partir de um estudo de outros aplicativos de Contatos e Mensagens, garantindo um terceiro filtro mais específico que pode selecionar usuários por nome.

### - Hierarquia e Divisão de Informação

A hierarquia das informações na página de perfil respeita os dados que são mais importantes para um aplicativo de Contatos e Mensagens, deixando a foto, o nome e a localização em destaque. Também foram utilizados cards com divisão de dados por grupo e links nas informações de contato.

### - Chat com persistência

As mensagens do chat são armazenadas localmente por usuário e podem ser visualizadas novamente durante toda a navegação do aplicativo.

### - Prototipagem de Design de Alto Nível

Para o design do aplicativo, foi feito a prototipagem final das telas utilizando o Software Figma, visando garantir refinamento no desenho das telas. As escolhas de cards, botões, cores e outros elementos foram pensados para manter um visual limpo, moderno e com foco na informação, tendo como inspiração aplicativos nativos do iOS 26.

### - Elementos de Vidro Líquido

Também inspirado no design system do iOS 26, foram utilizados componentes nativos do React Native como o Expo GlassEffect (expo-glass-effect) para desenhar elementos com visuais modernos e que se destacam.

## Implementações

- Listagem de usuários com paginação
- Pull-to-refresh
- Tratamento de erros e loadings
- Navegação de telas
- Filtros de dados
- Campo de Busca
- Tela de perfil com informações detalhadas
- Chat com histórico por usuário

## Melhorias Futuras

- Integração com backend
- Melhorias de performance e otimização
- Mais refinamento no design
- TabBar integrada com histórico de chats
- Suporte a Tema Escuro
- Persistência de dados para botão de curtida
