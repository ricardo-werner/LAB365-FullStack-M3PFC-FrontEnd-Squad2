import React from "react";
import Accordion from "react-bootstrap/Accordion";

export const DuvidasCard = () => {
  return (
    <Accordion defaultActiveKey="" flush className="container pt-1">
      <Accordion.Item eventKey="0" className="mt-3 p-4">
        <Accordion.Header>Problema para realizar o login?</Accordion.Header>
        <Accordion.Body>
          <span>
            Para realizar login no PharmaSellticos Marketplace o usuário deverá
            preencher um e-mail válido (obrigatório ter o '@') e da extensão
            '.com' ou '.com.br' (ou outra da sua organização). Além disso, no
            campo "Senha" é necessário informar uma senha com no mínimo 8
            caracteres. Para sua segurança utilize letras, números e evite dados
            pessoais (como nome, data de nascimento, etc.).
          </span>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="mt-3 p-4">
        <Accordion.Header>Como faço para fazer um pedido?</Accordion.Header>
        <Accordion.Body>
          <span>
            Fazer um pedido no PharmaSellticos Marketplace é simples. Basta
            seguir estes passos: (1) Faça o login na sua conta. (2) Procure os
            produtos desejados e adicione-os ao carrinho. (3) Vá para o carrinho
            e revise os itens. (4) Prossiga para o pagamento e siga as
            instruções para concluir o pedido.
          </span>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className="mt-3 mb-6 p-4">
        <Accordion.Header>Como rastrear meu pedido?</Accordion.Header>
        <Accordion.Body>
          <span>
            Para rastrear seu pedido, faça login na sua conta e vá para a seção
            "Meus Pedidos". Lá você encontrará informações atualizadas sobre o
            status do seu pedido, incluindo o número de rastreamento, se
            aplicável.
          </span>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className="mt-3 mb-6 p-4">
        <Accordion.Header>Qual é a política de devolução?</Accordion.Header>
        <Accordion.Body>
          <span>
            Nossa política de devolução permite que você devolva produtos dentro
            de 7 dias a partir da data da entrega, desde que estejam em
            condições originais. Entre em contato com nosso suporte ao cliente
            para iniciar o processo de devolução.
          </span>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
