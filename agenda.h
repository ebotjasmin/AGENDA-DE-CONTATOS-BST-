#ifndef AGENDA_H
#define AGENDA_H

typedef struct Contato {
    char nome[100];
    char telefone[20];
    char email[100];

    struct Contato *esq;
    struct Contato *dir;

} Contato;

Contato *criarContato(
    char nome[],
    char telefone[],
    char email[]
);

Contato *inserirContato(
    Contato *raiz,
    char nome[],
    char telefone[],
    char email[]
);

void listarContatos(Contato *raiz);

Contato *buscarContato(Contato *raiz, char nome[]);


Contato *menorContato(Contato *raiz);

Contato *removerContato(
    Contato *raiz,
    char nome[]
);

#endif

