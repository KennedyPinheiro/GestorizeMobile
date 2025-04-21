# GestorizeMobile 📱💼

Simplifique a gestão da sua empresa na palma da mão!
📌 Sobre o Projeto

O GestorizeMobile é um aplicativo mobile em desenvolvimento para auxiliar pequenas e médias empresas no gerenciamento de funcionários, clientes, produtos e orçamentos. Com uma interface intuitiva e moderna, permite um controle eficiente e organizado de informações essenciais para o funcionamento do negócio.
🚀 Funcionalidades
🔹 Cadastro de Funcionários

    Registre e gerencie informações dos colaboradores.
    Atualize e visualize detalhes dos funcionários ativos.

🔹 Gerenciamento de Clientes

    Adicione e organize clientes em um banco de dados estruturado.
    Consulte o histórico de interações e orçamentos.

🔹 Controle de Produtos

    Cadastre produtos e serviços com descrições detalhadas.
    Atualize preços e monitore o estoque com facilidade.

🔹 Criação de Orçamentos

    Gere orçamentos personalizados para os clientes.
    Edite, salve e exporte orçamentos em PDF.

🔹 Segurança e Acessibilidade

    Login seguro com autenticação JWT.
    Interface responsiva e amigável para dispositivos móveis.

🛠 Tecnologias Utilizadas

    Frontend: React Native
    Backend: Node.js (Express)
    Banco de Dados: MySQL

📂 Instalação e Configuração
🔧 Pré-requisitos

Certifique-se de ter instalado:

    Node.js
    MySQL
    React Native CLI

🔹 Backend (API)

    Clone o repositório:

git clone https://github.com/KennedyPinheiro/GestorizeMobile.git
cd GestorizeMobile/backend

Instale as dependências:

npm install

Configure o banco de dados MySQL no arquivo .env:

DB_HOST=localhost  
DB_USER=seu_usuario  
DB_PASSWORD=sua_senha  
DB_NAME=gestorize_db  

Execute as migrações do banco:

npx sequelize-cli db:migrate

Inicie o servidor:

    npm start

🔹 Frontend (Mobile)

    Acesse a pasta do app:

cd ../mobile

Instale as dependências:

npm install

Execute o aplicativo no emulador ou dispositivo físico:

npx react-native run-android  # Para Android  
npx react-native run-ios
