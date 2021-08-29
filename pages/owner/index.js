import { useRouter } from "next/router"
import { UserIcon, PencilIcon } from '@heroicons/react/solid'

import Page from '../../components/page'
import { useGetOwners } from '../../hooks/useOwner'

export default function Index() {
    const router = useRouter()

    const { data: owners, isLoading, error } = useGetOwners()

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
                                        Name
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
                                    <tr key={owner.id} className={ownerIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{owner.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a
                                                href={`/owner/${owner.id}`}
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
