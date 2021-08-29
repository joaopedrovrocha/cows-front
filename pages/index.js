import React from 'react'

import Page from '../components/page'
import Loading from '../components/loading'

import { useGetCows } from "../hooks/useCow"
import { useGetOwners } from "../hooks/useOwner"

export default function Home() {

    const { data: cows, isLoading: isCowsLoading } = useGetCows()
    const { data: owners, isLoading: isOwnersLoading } = useGetOwners()

    if (isCowsLoading || isOwnersLoading) {
        return <Loading />
    }

    return (
        <Page>
            {owners && owners.length > 0 && (
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Quantidade de Vacas por Proprietário</h3>
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {owners.map((owner) => (
                            <div key={owner.id} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">{owner.name}</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{cows.filter(el => el.ownerId === owner.id).length}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            )}

            {!owners && (<h2>Nenhum proprietário cadastrado.</h2>)}
        </Page>
    )
}
