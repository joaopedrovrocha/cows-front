import { useRouter } from "next/router"
import { UserIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'

import Page from '../../components/page'
import { useGetOwners } from '../../hooks/useOwner'
import {useState} from "react";

import service from '../../lib/service'
import {useSWRConfig} from "swr";

export default function Index() {
    const router = useRouter()

    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeleteWaiting, setIsDeleteWaiting] = useState(false)
    const [elementToDelete, setElementToDelete] = useState(null)

    const { data: owners, isLoading, error } = useGetOwners()

    const { mutate } = useSWRConfig()

    function removeElement(element) {
        setElementToDelete(element)
        setIsDeleting(true)
    }

    function doRemoveElement() {
        setIsDeleteWaiting(true)

        service
            .delete(`/owners/${elementToDelete._id}`)
            .then(response => {
                mutate('/owners')

                setIsDeleting(false)
                setElementToDelete(null)
                setIsDeleteWaiting(false)
            })
    }

    if (isDeleting) {
        return (
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Remover Proprietário ({ elementToDelete.name.toUpperCase() })</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>Deseja realmente remover esse proprietário? Essa ação não pode ser desfeita.</p>
                    </div>
                    <div className="mt-5">
                        {isDeleteWaiting && (
                            <span>Removendo...</span>
                        )}

                        {!isDeleteWaiting && (
                            <>
                                <button
                                    type="button"
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => { setIsDeleting(false) && setElementToDelete(null) }}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    className="ml-3 inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                    onClick={() => { doRemoveElement() }}
                                >
                                    Remover
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Page title="Proprietários">
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={ () => router.push('/owner/new') }
              >
                  <UserIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" /> Novo Proprietário
              </button>
            </span>

            <br clear="all" /><br clear="all" />

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Nome
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Ações</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {isLoading && (
                                    <tr className={'bg-white'}>
                                        <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">Carregando..</td>
                                    </tr>
                                )}

                                {!isLoading && !error && owners.map((owner, ownerIdx) => (
                                    <tr key={owner._id} className={ownerIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{owner.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a
                                                href={`/owner/${owner._id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            > <PencilIcon className="inline-block h-5 w-5" aria-hidden="true" /> </a>
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                                onClick={() => { removeElement(owner) }}
                                            > <TrashIcon className="inline-block h-5 w-5" aria-hidden="true" /> </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}
