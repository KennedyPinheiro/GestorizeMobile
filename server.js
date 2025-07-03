import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

const supabaseAdmin = createClient(
  "https://xvpdbapjbaelnxgsrecc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cGRiYXBqYmFlbG54Z3NyZWNjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODcyNDE4OCwiZXhwIjoyMDY0MzAwMTg4fQ.-wADobsulCJ8_QrLLB1dQ2T7RmpabwiF7MqjSJXsYDA"
);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

//Funcionarios

app.delete("/delete-user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const { data, error } = await supabaseAdmin
      .from("funcionarios")
      .select("endereco_id")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Erro ao buscar endereco_id:", error.message);
      return res.status(500).json({ error: error.message });
    }

    await supabaseAdmin.from("endereco").delete().eq("id", data.endereco_id);
    await supabaseAdmin.from("funcionarios").delete().eq("id", userId);
    await supabaseAdmin.from("users").delete().eq("id", userId);
    await supabaseAdmin.auth.admin.deleteUser(userId);

    res.json({ message: "Usuário deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar usuário:", err.message);
    res.status(500).json({ error: err.message });
  }
});
app.put("/update-user/:id", async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ error: "Nenhum dado fornecido para atualização." });
  }

  try {
    const camposFuncionario = [
      "nome",
      "email",
      "cpf",
      "rg",
      "data_nascimento",
      "genero",
      "estado_civil",
      "telefone",
      "cargo",
    ];

    const camposEndereco = [
      "rua",
      "bairro",
      "cidade",
      "estado",
      "numero",
      "cep",
    ];

    const funcionarioUpdates = {};
    const enderecoUpdates = {};

    for (const [campo, valor] of Object.entries(updates)) {
      if (camposFuncionario.includes(campo)) {
        funcionarioUpdates[campo] = valor;
      } else if (camposEndereco.includes(campo)) {
        enderecoUpdates[campo] = valor;
      }
    }

    if (Object.keys(funcionarioUpdates).length > 0) {
      funcionarioUpdates.ultima_atualizacao = new Date();
      await supabaseAdmin
        .from("funcionarios")
        .update(funcionarioUpdates)
        .eq("id", userId);
    }

    if (Object.keys(enderecoUpdates).length > 0) {
      if (!updates.endereco_id) {
        return res.status(400).json({
          error: "endereco_id não fornecido para atualização do endereço.",
        });
      }

      await supabaseAdmin
        .from("endereco")
        .update(enderecoUpdates)
        .eq("id", updates.endereco_id);
    }

    if (updates.nome || updates.email) {
      const userFields = {};
      if (updates.nome) userFields.nome = updates.nome;
      if (updates.email) userFields.email = updates.email;

      await supabaseAdmin.from("users").update(userFields).eq("id", userId);
    }

    return res.json({ message: "Atualização realizada com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

//Fornecedor
app.delete("/delete-fornecedor/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { data: pjData, error: pjError } = await supabaseAdmin
      .from("fornecedor")
      .select("endereco_id")
      .eq("id", id)
      .maybeSingle();

    if (pjError) {
      console.error(
        "Erro ao buscar endereco_id em fornecedor:",
        pjError.message
      );
      return res.status(500).json({ error: pjError.message });
    }

    if (pjData?.endereco_id) {
      await supabaseAdmin
        .from("endereco")
        .delete()
        .eq("id", pjData.endereco_id);
    }

    await supabaseAdmin.from("fornecedor").delete().eq("id", id);

    res.json({ message: "Fornecedor deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar fornecedor:", err.message);
    res.status(500).json({ error: err.message });
  }
});

//Clientes
app.delete("/delete-cliente/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { data: pfData, error: pfError } = await supabaseAdmin
      .from("pessoa_fisica")
      .select("endereco_id")
      .eq("id", id)
      .maybeSingle();

    if (pfError) {
      console.error(
        "Erro ao buscar endereco_id em pessoa_fisica:",
        pfError.message
      );
      return res.status(500).json({ error: pfError.message });
    }

    const { data: pjData, error: pjError } = await supabaseAdmin
      .from("pessoa_juridica")
      .select("endereco_id")
      .eq("id", id)
      .maybeSingle();

    if (pjError) {
      console.error(
        "Erro ao buscar endereco_id em pessoa_juridica:",
        pjError.message
      );
      return res.status(500).json({ error: pjError.message });
    }

    if (pfData?.endereco_id) {
      await supabaseAdmin
        .from("endereco")
        .delete()
        .eq("id", pfData.endereco_id);
    }

    if (pjData?.endereco_id) {
      await supabaseAdmin
        .from("endereco")
        .delete()
        .eq("id", pjData.endereco_id);
    }

    await supabaseAdmin.from("pessoa_fisica").delete().eq("id", id);
    await supabaseAdmin.from("pessoa_juridica").delete().eq("id", id);

    res.json({ message: "Cliente deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar cliente:", err.message);
    res.status(500).json({ error: err.message });
  }
});


  //Produtos
app.delete("/delete-produto/:id", async (req, res) => {
  const produtoId = req.params.id;

  try {
    const { data, error } = await supabaseAdmin
      .from("produtos")
      .select("id")
      .eq("id", produtoId)
      .maybeSingle();


    if (error) {
      console.error("Erro ao buscar produto:", error.message);
      return res.status(500).json({ error: error.message });
    }

    await supabaseAdmin.from("produtos").delete().eq("id", produtoId);

    res.json({ message: "Produto deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar produto:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put("/update-produto/:id", async (req, res) => {
    const produtoId = req.params.id;
    const updates = req.body;
  
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "Nenhum dado fornecido para atualização." });
    }
  
    const camposValidos = [
      "nome",
      "quantidade",
      "medida_id",
      "descricao",
      "data_validade",
      "data_de_entrada",
      "preco_custo",
      "margem_lucro",
      "fornecedor_id",
      "categoria_id",
    ];
  
    const camposParaAtualizar = Object.entries(updates).reduce((acc, [campo, valor]) => {
      if (camposValidos.includes(campo)) {
        acc[campo] = valor;
      }
      return acc;
    }, {});
  
    if (Object.keys(camposParaAtualizar).length === 0) {
      return res.status(400).json({ error: "Nenhum campo válido para atualizar." });
    }
  
    camposParaAtualizar.ultima_atualizacao = new Date();
  
    try {
      const { error } = await supabaseAdmin
        .from("produtos")
        .update(camposParaAtualizar)
        .eq("id", produtoId);
  
      if (error) {
        console.error("Erro ao atualizar produto:", error.message);
        return res.status(500).json({ error: error.message });
      }
  
      return res.json({ message: "Produto atualizado com sucesso." });
    } catch (err) {
      console.error("Erro inesperado ao atualizar produto:", err.message);
      return res.status(500).json({ error: err.message });
    }
  });



