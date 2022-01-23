<div align="center">
  <img alt="ReactJS" title="ReactJS" src="https://github.com/Jordaobm/tests-react/blob/master/src/assets/test.png" width="300px" />
</div>

<br/>
<br/>

[badge-branches]: https://github.com/Jordaobm/tests-react/blob/master/src/assets/badge-branches.svg
[badge-functions]: https://github.com/Jordaobm/tests-react/blob/master/src/assets/badge-functions.svg
[badge-lines]: https://github.com/Jordaobm/tests-react/blob/master/src/assets/badge-lines.svg
[badge-statements]: https://github.com/Jordaobm/tests-react/blob/master/src/assets/badge-statements.svg

![Badge-branches][badge-branches]
![Badge-functions][badge-functions]
![Badge-lines][badge-lines]
![Badge-statements][badge-statements]



<h1>⚗️ Testes</h1>

<h2 id="start">📙Sumário</h2>

<ul>
  <li><a href="#sobre">Sobre o repositório</a></li>
  <li><a href="#motivo">Por que testes?</a></li>
  <li><a href="#tests">Testes Unitários e de Integração</a></li>
  <li><a href="#testingComponents">Testando componentes</a>
  <li><a href="#testingPages">Testando páginas</a> 
  <li><a href="#playground">Playground de Testes</a>
  <li><a href="#coverage">Coverage Report</a>
  <li><a href="#fim">Considerações finais</a>
  <li><a href="#creditos">Créditos</a>
    
</ul>

<h2 id="sobre">💡 Sobre o repositório</h2>
Esse repositório tem como objetivo apenas entender e agrupar um conhecimento adquirido durante um módulo muito interessante do bootcamp ignite da <a href="https://app.rocketseat.com.br/node/testes-unitarios-no-react/group/introducao-7/lesson/testes-no-front-end-tipos-de-testes">Rocketseat 🚀</a>. O módulo fala sobre testes no React e a importância de escrever testes em nossa aplicação. Abaixo segue o conteúdo estudado durante o módulo.

<h2 id="motivo">🤔 Por que testes?</h2>

<p>
Escrevemos testes na aplicação visando a segurança na hora da manutenção do código e também realmente testar se a funcionalidade está de acordo com o esperado.
</p>


<h2 id="tests">🔨 Testes Unitários e de Integração</h2>

<p>
Quando escrevemos uma aplicação, geralmente separamos cada parte do nosso código em <strong>componentes</strong> menores, pois conforme a necessidade podemos reutilizar esses componentes e também deixá-los em um formato mais legível e menos verboso. Quando pensamos em <strong>testes unitários</strong> estamos nos referindo aos testes desses componentes menores e testes focados somente na funcionalidade daquele componente específico.
</p>

<p>
<strong>Testes de Integração</strong> são geralmente testes onde conectamos um componente à outro para validar e testar se o comportamento entre os dois componentes está de acordo com o esperado... é como conectar o formulário de login com o componente que exibe as informações do usuário... depois de fazer login na aplicação, o componente que exibe as informações deve exibi-las... esse é um exemplo de teste de integração
</p>


<h2 id="testingComponents">👨‍🔬 Testando componentes</h2>

<p>
Para testar um componente simples da aplicação, comecei escrevendo o teste do componente Form. Esse componente é responsável por um input de textos e um botão que chama uma função do contexto para executar uma ação. Como estamos testando somente o componente Form... começo <strong>mockando</strong> o contexto de onde vem a função utilizada pelo Form.
</p>

```typescript

import { fireEvent, render, screen } from "@testing-library/react";
import { Video } from "../../context/user";
import { Form } from "./Form";

let videos: Video[] = [];

function handleAddVideo(video: Video) {
  videos = [...videos, video];
}

function mockUseUser() {
  return {
    user: {
      googleId: "116242710850423568991",
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJwxyZDG9G6Vg4NwhfZdHPa4u0EhhBDoWaPEPOT9=s96-c",
      email: "rarius16@gmail.com",
      name: "Olimpo Rarius",
      givenName: "Olimpo",
      familyName: "Rarius",
    },
    handleAddVideo,
    videos,
  };
}

jest.mock("../../context/user", () => {
  return {
    useUser: mockUseUser,
  };
});

```

<p>Depois de mockar os dados, vamos executar algumas ações nesse componente Form</p>
<p>Toda vez que escrevo um teste, penso que o primeiro teste a ser feito é se o componente está sendo renderizado em tela corretamente... então, esse será meu primeiro teste. Nesse teste eu apenas verifico se há, na DOM, um elemento input que tenha placeholder ""Digite a url" e id "url"</p>

```typescript

it("should be able to render Form component", () => {
    render(<Form />);

    const input = screen.getAllByPlaceholderText(
      "Digite a url"
    )[0] as HTMLInputElement;

    expect(input?.id).toBe("url");
  });

```

<p>Como segundo e último teste (pois o componente é muito simples), vamos chamar a ação disparada no botão de buscar do componente Form. Nesse teste eu adiciono uma URL no meu input via <strong>fireEvent</strong> e logo em seguida clico no botão... disparando a ação de adicionar a url digitada em um array de url's... e é exatamente isso que eu espero... espero que a minha url tenha sido adicionada no array.</p>


```typescript

it("should be able to search Video by input search", () => {
    render(<Form />);

    const input = screen.getAllByPlaceholderText(
      "Digite a url"
    )[0] as HTMLInputElement;

    const button = screen.getByText("Buscar");

    fireEvent.change(input, {
      target: { value: "https://www.youtube.com/watch?v=pbwXsjVEMqg" },
    });

    fireEvent.click(button);

    expect(videos).toEqual(
      expect.arrayContaining([
        {
          googleId: "116242710850423568991",
          url: "https://www.youtube.com/watch?v=pbwXsjVEMqg",
        },
      ])
    );

    expect(input.value).toBe("");
  });

```

<p>Como último passo dentro dos testes desse componente, eu vou agrupar os testes dentro de um <strong>describe</strong>, e então na hora de rodar os testes ele também ficará agrupado por componente testado, melhorando a visualização posteriormente</p>

```typescript

describe("Form", () => {
  it("should be able to render Form component", () => {
    render(<Form />);

    const input = screen.getAllByPlaceholderText(
      "Digite a url"
    )[0] as HTMLInputElement;

    expect(input?.id).toBe("url");
  });

  it("should be able to search Video by input search", () => {
    render(<Form />);

    const input = screen.getAllByPlaceholderText(
      "Digite a url"
    )[0] as HTMLInputElement;

    const button = screen.getByText("Buscar");

    fireEvent.change(input, {
      target: { value: "https://www.youtube.com/watch?v=pbwXsjVEMqg" },
    });

    fireEvent.click(button);

    expect(videos).toEqual(
      expect.arrayContaining([
        {
          googleId: "116242710850423568991",
          url: "https://www.youtube.com/watch?v=pbwXsjVEMqg",
        },
      ])
    );

    expect(input.value).toBe("");
  });
});


```



<h2 id="testingPages">📃 Testando páginas</h2>

<p>Para testar as páginas da aplicação, utilizei o mesmo conceito dos testes em componentes. Testes em páginas geralmente já entram no quesito de <strong>integração</strong>, pois em uma mesma página renderizamos vários componentes. Como minha aplicação é bem simples e o foco aqui é apenas o entendimento básico da escrita inicial de testes, realizei testes apenas de renderização. Aqui também precisei <strong>mockar</strong> o contexto da aplicação para que pudessemos testar os vários casos em que os componentes podem estar inseridos</p>

<p>Renderização da página sem um usuário logado</p>

```typescript

it("should be able to render Home page", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const container = screen.getByTestId("container") as HTMLDivElement;

    expect(container?.className).toBe("container");
  });

```

<p>Renderização da página com um usuário logado</p>

```typescript

it("should be able to render Home page logged user", () => {
    handleSignIn({
      googleId: "116242710850423568991",
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJwxyZDG9G6Vg4NwhfZdHPa4u0EhhBDoWaPEPOT9=s96-c",
      email: "rarius16@gmail.com",
      name: "Olimpo Rarius",
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      "Digite a url"
    ) as HTMLInputElement;

    expect(input?.id).toBe("url");
  });

```


<h2 id="playground">🛴 Playground de Testes</h2>

<p>Quando estivermos realizando testes, uma funcionalidade bem legal da lib <strong>@testing-library/react</strong> é podermos visualizar em tela os componentes sendo renderizados como estão sendo visualizados. Para isso, basta adicionar os seguintes trechos de código em seu teste</p>


<p>Importe screen de dentro da lib</p>

```typescript

import { render, screen } from "@testing-library/react";

```

<p>Dentro do seu teste, no final do teste e antes do expect, adicione</p>

```typescript

screen.logTestingPlaygroundURL();

```

<p>Isso dará a você um link direto no console onde estão sendo executados os testes para que você possa visualizar seu compomente/página</p>



<h2 id="coverage">📚 Coverage Report</h2>

<p>Para saber se sua aplicação está de fato <strong>coberta por testes</strong>, o <strong>jest</strong> nos dá a função de gerar um relatório de cobertura de código, que nos informa tudo sobre nossos testes, desde a quantidade de código já testada até o número de vezes que os testes executaram em cada arquivo</p>

<div align="center">
  <img alt="Coverage" title="Coverage" src="https://github.com/Jordaobm/tests-react/blob/master/src/assets/coverage.png" width="100%" />
</div>


<p>E ainda adicionei outra biblioteca que gera alguns SVG's muito legais e úteis para esquema de documentação da aplicação... a biblioteca é a <strong>jest-coverage-badges</strong>, e ela gera esses badges aqui</p>

[badge-branches]: https://github.com/Jordaobm/tests-react/blob/master/src/assets/badge-branches.svg
[badge-functions]: https://github.com/Jordaobm/tests-react/blob/master/src/assets/badge-functions.svg
[badge-lines]: https://github.com/Jordaobm/tests-react/blob/master/src/assets/badge-lines.svg
[badge-statements]: https://github.com/Jordaobm/tests-react/blob/master/src/assets/badge-statements.svg

![Badge-branches][badge-branches]
![Badge-functions][badge-functions]
![Badge-lines][badge-lines]
![Badge-statements][badge-statements]


<h2 id="fim">👷 Considerações finais</h2>

O repositório ficará guardado com esse conhecimento para que futuramente quando precisarmos, ele estará aqui e disponível para consulta.

<h2 id="creditos">👨‍🎓 Créditos</h2>

A todo pessoal da <a href="https://app.rocketseat.com.br/node/testes-unitarios-no-react/group/introducao-7/lesson/testes-no-front-end-tipos-de-testes">Rocketseat 🚀</a> pelo módulo super interessante!!!

<a href="#start">👆 Voltar ao Sumário</a>

### Autor

---

<a href="https://github.com/Jordaobm" target="_blank">
 <img src="https://avatars.githubusercontent.com/u/70074016?v=4" width="100px;" alt="Jordão"/>
 <br />
 <sub><b>Jordão Beghetto Massariol</b></sub></a> <a href="https://github.com/Jordaobm" title="Jordão">🚀</a>

Feito com ❤️ por Jordão Beghetto Massariol 👋🏽 Entre em contato!

<a href="https://www.linkedin.com/in/jord%C3%A3o-beghetto-massariol-9a9800105/"><img alt="Linkedin" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>

