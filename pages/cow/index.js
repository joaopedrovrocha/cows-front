import { useRouter } from "next/router"

import {PencilIcon, TagIcon} from '@heroicons/react/solid'

import Page from '../../components/page'
import { useGetCows } from '../../hooks/useCow'

import { getBirthMonth, getAge, getGender } from '../../helpers/cow.helper'

export default function Index() {
    const router = useRouter()

    const { data: cows, isLoading, error } = useGetCows()

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

            <br clear="all" /><br clear="all" />

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
                                    {/*<th scope="col" className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
                                    {/*    Mês de Nascimento*/}
                                    {/*</th>*/}
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
                                        <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">Carregando..</td>
                                    </tr>
                                )}

                                {!isLoading && !error && cows.map((cow, cowIdx) => (
                                    <tr key={cow.id} className={cowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ cow.name }</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ cow.owner.name }</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ getGender(cow.gender) }</td>
                                        {/*<td className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ getBirthMonth(cow.birthMonth) }</td>*/}
                                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ getAge(cow.birthMonth) }</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ cow.quantity || 1 }</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a
                                                href={`/cow/${cow.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            > <PencilIcon className="inline-block h-5 w-5" aria-hidden="true" /> </a>
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
