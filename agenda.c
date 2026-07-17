#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "agenda.h"

Contato *criarContato(char nome[], char telefone[], char email[]) {
    Contato *novo = malloc(sizeof(Contato));

    if (novo == NULL) {
        printf("Erro ao alocar memória.\n");
        return NULL;
    }

    strcpy(novo->nome, nome);
    strcpy(novo->telefone, telefone);
    strcpy(novo->email, email);

    novo->esq = NULL;
    novo->dir = NULL;

    return novo;
}

Contato *inserirContato(
    Contato *raiz,
    char nome[],
    char telefone[],
    char email[]
) {
    if (raiz == NULL) {
        return criarContato(nome, telefone, email);
    }

    if (strcmp(nome, raiz->nome) < 0) {
        raiz->esq = inserirContato(
            raiz->esq,
            nome,
            telefone,
            email
        );
    } else if (strcmp(nome, raiz->nome) > 0) {
        raiz->dir = inserirContato(
            raiz->dir,
            nome,
            telefone,
            email
        );
    } else {
        printf("Contato já existe.\n");
    }

    return raiz;
}

void listarContatos(Contato *raiz) {
    if (raiz == NULL) {
        return;
    }

    listarContatos(raiz->esq);

    printf("\nNome: %s\n", raiz->nome);
    printf("Telefone: %s\n", raiz->telefone);
    printf("E-mail: %s\n", raiz->email);

    listarContatos(raiz->dir);
}

Contato *buscarContato(Contato *raiz, char nome[]) {

    if (raiz == NULL)
        return NULL;

    int cmp = strcmp(nome, raiz->nome);

    if (cmp == 0)
        return raiz;

    if (cmp < 0)
        return buscarContato(raiz->esq, nome);

    return buscarContato(raiz->dir, nome);
}


Contato *menorContato(Contato *raiz) {

    if (raiz == NULL)
        return NULL;

    if (raiz->esq == NULL)
        return raiz;

    return menorContato(raiz->esq);
}


Contato *removerContato(Contato *raiz, char nome[]) {

    if (raiz == NULL)
        return NULL;

    int cmp = strcmp(nome, raiz->nome);

    if (cmp < 0) {

        raiz->esq = removerContato(
            raiz->esq,
            nome
        );

    } else if (cmp > 0) {

        raiz->dir = removerContato(
            raiz->dir,
            nome
        );

    } else {

        if (raiz->esq == NULL && raiz->dir == NULL) {

            free(raiz);
            return NULL;

        }

        if (raiz->esq == NULL) {

            Contato *temp = raiz->dir;
            free(raiz);
            return temp;

        }

        if (raiz->dir == NULL) {

            Contato *temp = raiz->esq;
            free(raiz);
            return temp;

        }

        Contato *temp = menorContato(raiz->dir);

        strcpy(raiz->nome, temp->nome);
        strcpy(raiz->telefone, temp->telefone);
        strcpy(raiz->email, temp->email);

        raiz->dir = removerContato(
            raiz->dir,
            temp->nome
        );

    }

    return raiz;
}

void salvarArquivo(Contato *raiz, FILE *arquivo) {
    if (raiz == NULL)
        return;

    salvarArquivo(raiz->esq, arquivo);

    fprintf(
        arquivo,
        "%s;%s;%s\n",
        raiz->nome,
        raiz->telefone,
        raiz->email
    );

    salvarArquivo(raiz->dir, arquivo);
}

Contato *carregarArquivo(Contato *raiz, FILE *arquivo) {
    char linha[250];
    char nome[100];
    char telefone[20];
    char email[100];

    if (fgets(linha, sizeof(linha), arquivo) == NULL) {
        return raiz;
    }

    if (sscanf(
            linha,
            "%99[^;];%19[^;];%99[^\n]",
            nome,
            telefone,
            email
        ) == 3) {

        raiz = inserirContato(
            raiz,
            nome,
            telefone,
            email
        );
    }

    return carregarArquivo(raiz, arquivo);
}