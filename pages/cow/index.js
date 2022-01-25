import { useRouter } from "next/router"

import {PencilIcon, TagIcon, TrashIcon} from '@heroicons/react/solid'

import Page from '../../components/page'
import { useGetCows } from '../../hooks/useCow'

import { useGetOwners } from '../../hooks/useOwner'

import { getAge, getGender } from '../../helpers/cow.helper'
import {useState, useMemo} from "react";
import {useSWRConfig} from "swr";
import service from "../../lib/service";

export default function Index() {
    const router = useRouter()

    const { data: cows, isLoading, error } = useGetCows()
    const { data: owners, isLoading: isLoadingOwners } = useGetOwners()

    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeleteWaiting, setIsDeleteWaiting] = useState(false)
    const [elementToDelete, setElementToDelete] = useState(null)
    const [ownerSelected, setOwnerSelected] = useState('all')

    const cowsFiltered = useMemo(() => {
        if (ownerSelected === 'all') {
            return cows
        }

        return cows.filter(cow => cow.owner._id === ownerSelected)

    }, [cows, ownerSelected])

    function onOwnerFilterChange(e) {
        setOwnerSelected(e.target.value)
    }

    const { mutate } = useSWRConfig()

    function removeElement(element) {
        setElementToDelete(element)
        setIsDeleting(true)
    }

    function doRemoveElement() {
        setIsDeleteWaiting(true)

        service
            .delete(`/cows/${elementToDelete._id}`)
            .then(() => {
                mutate('/cows')

                setIsDeleting(false)
                setElementToDelete(null)
                setIsDeleteWaiting(false)
                setOwnerSelected('all')
            })
    }

    if (isDeleting) {
        return (
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Remover Vaca(s)</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>Deseja realmente remover essa(s) vaca(s)? Essa ação não pode ser desfeita.</p>
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

    if (isLoading || isLoadingOwners) {
        return <div></div>
    }

    let ownersForFilter = Object.values({ ...owners })
    ownersForFilter.unshift({ _id: 'all', name: 'Todos' })

    return (
        <Page title="Vacas">
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={ () => router.push('/cow/new') }
              >
                  <TagIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" /> Nova Vaca
              </button>
            </span>

            { !isLoadingOwners && (
                <>
                    <br clear="all" /><br clear="all" />

                    <div>
                        <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
                            Filtrar por Proprietário
                        </label>

                        <select
                            id="owner"
                            name="owner"
                            className="mt-1 block w-2/5 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            defaultValue="0"
                            onChange={onOwnerFilterChange}
                        >
                            {ownersForFilter.map(owner => (
                                <option key={owner._id} value={owner._id}>{ owner.name }</option>
                            ))}
                        </select>
                    </div>
                </>
            ) }

            <br clear="all" />

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th width="20%" scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nome / Lote
                                    </th>
                                    <th width="35%" scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Proprietário
                                    </th>
                                    <th width="15%" scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Gênero
                                    </th>
                                    <th width="15%" scope="col" className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Idade
                                    </th>
                                    <th width="15%" scope="col" className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantidade
                                    </th>
                                    <th width="10%" scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Ações</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {isLoading && (
                                    <tr className={'bg-white'}>
                                        <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">Carregando..</td>
                                    </tr>
                                )}

                                {!isLoading && !error && cowsFiltered.map((cow, cowIdx) => (
                                    <tr key={cow._id} className={cowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ cow.name }</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ cow.owner.name }</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ getGender(cow.gender) }</td>
                                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ getAge(cow.birthMonth) }</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{ cow.quantity || 1 }</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a
                                                href={`/cow/${cow._id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            > <PencilIcon className="inline-block h-5 w-5" aria-hidden="true" /> </a>
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                                onClick={() => { removeElement(cow) }}
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
