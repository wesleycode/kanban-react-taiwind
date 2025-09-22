import type { ProjetoType } from "@/application/types/ProjetoType";

export async function getListarProjetos() {

    await new Promise(resolve => setTimeout(resolve, 3000));

    const projetosDefault: ProjetoType[] = [
        {
            id: '111160ae-a68f-4d45-8b88-dbb40c7c66a7',
            titulo: 'Meu Projeto',
            descricao: 'Um projeto para organizar meus produtos.',
            atualizado_em: '2025-09-20 14:30:45.123456-03'
        }
    ];

    return projetosDefault;
}