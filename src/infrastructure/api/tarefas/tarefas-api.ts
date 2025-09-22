export async function getListarSubTasks() {

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const subtarefas = [
        {
            id: 0,
            titulo: 'Teste de subtarefa 1 aqui',
            finalizada: true,
        },
        {
            id: 1,
            titulo: 'Teste de subtarefa 2 aqui',
            finalizada: false,
        }
    ];

    return subtarefas;
}