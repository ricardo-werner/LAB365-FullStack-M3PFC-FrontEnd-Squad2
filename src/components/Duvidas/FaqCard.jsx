import React from "react";
import Accordion from "react-bootstrap/Accordion";

export function DuvidasCard() {
    return (
        <Accordion defaultActiveKey="" flush className="container pt-1">
            <Accordion.Item eventKey="0" className="mt-3 p-4">
                <Accordion.Header>Problema para realizar o login?</Accordion.Header>
                <Accordion.Body>
                    <span>
                        Para realizar login no PharmaSellticos Marketplace o usuário deverá
                        preencher um e-mail válido (obrigatório ter o '@') e da extensão
                        '.com' ou '.com.br' (ou outra da sua organização).
                        Além disso, no campo "Senha" é necessário informar uma senha
                        com no mínimo 8 caracteres.
                        Para sua segurança utilize letras, números e evite dados pessoais
                        (como nome, data de nascimento, etc.).
                    </span>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="mt-3 p-4">
                <Accordion.Header>Problema relacionado ####?</Accordion.Header>
                <Accordion.Body>
                    <span>
                        No PharmaSellticos Marketplace
                    </span>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="mt-3 mb-6 p-4">
                <Accordion.Header>Problema relacionado #####?</Accordion.Header>
                <Accordion.Body>
                    <span>
                        No PharmaSellticos Marketplace
                    </span>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}