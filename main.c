#include <stdio.h>
#include "agenda.h"

int main() {
    Contato *raiz = NULL;
    Contato *contato;
    FILE *arquivo;
    int opcao;

    arquivo = fopen("agenda.txt", "r");

    if (arquivo != NULL) {
        raiz = carregarArquivo(raiz, arquivo);
        fclose(arquivo);
    }

    do {
        printf("\n===== AGENDA DE CONTATOS =====\n");
        printf("1 - Inserir contato\n");
        printf("2 - Listar contatos\n");
        printf("3 - Buscar contato\n");
        printf("4 - Remover contato\n");
        printf("5 - Sair\n");
        printf("Escolha uma opcao: ");

        scanf("%d", &opcao);

        switch (opcao) {

            case 1: {
                char nome[100];
                char telefone[20];
                char email[100];

                printf("\nNome: ");
                scanf(" %99[^\n]", nome);

                printf("Telefone: ");
                scanf(" %19s", telefone);

                printf("E-mail: ");
                scanf(" %99s", email);

                if (buscarContato(raiz, nome) != NULL) {
                    printf("\nJa existe um contato com esse nome.\n");
                } else {
                    raiz = inserirContato(
                        raiz,
                        nome,
                        telefone,
                        email
                    );

                    printf("\nContato cadastrado com sucesso.\n");
                }

                break;
            }

            case 2:
    printf("\n=== CONTATOS CADASTRADOS ===\n");

    if (raiz == NULL) {
        printf("A agenda esta vazia.\n");
    } else {
        listarContatos(raiz);
    }

    break;
            case 3: {
                char nome[100];

                printf("\nDigite o nome do contato: ");
                scanf(" %99[^\n]", nome);

                contato = buscarContato(raiz, nome);

                if (contato == NULL) {
                    printf("\nContato nao encontrado.\n");
                } else {
                    printf("\n=== CONTATO ENCONTRADO ===\n");
                    printf("Nome: %s\n", contato->nome);
                    printf("Telefone: %s\n", contato->telefone);
                    printf("E-mail: %s\n", contato->email);
                }

                break;
            }

            case 4: {
                char nome[100];

                printf("\nNome do contato a remover: ");
                scanf(" %99[^\n]", nome);

                contato = buscarContato(raiz, nome);

                if (contato == NULL) {
                    printf("\nContato nao encontrado.\n");
                } else {
                    raiz = removerContato(raiz, nome);
                    printf("\nContato removido com sucesso.\n");
                }

                break;
            }

            case 5:
                arquivo = fopen("agenda.txt", "w");

                if (arquivo == NULL) {
                    printf("\nErro ao abrir agenda.txt para salvar.\n");
                } else {
                    salvarArquivo(raiz, arquivo);
                    fclose(arquivo);

                    printf("\nContatos salvos com sucesso.\n");
                }

                printf("Programa encerrado.\n");
                break;

            default:
                printf("\nOpcao invalida.\n");
        }

    } while (opcao != 5);

    return 0;
}