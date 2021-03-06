import React, {useRef, useState} from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"

import Page from '../../components/page'
import Notify from '../../components/notify'
import Loading from "../../components/loading"

import service from '../../lib/service'

import { useGetOwner } from "../../hooks/useOwner"

export default function New() {

    const [isFormLoading, setIsFormLoading] = useState(false)

    const notifyRef = useRef()

    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { id } = router.query

    const { data: owner, isLoading, error } = useGetOwner(id)

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Required')
    })

    const {handleChange, handleSubmit, errors} = useFormik({
        enableReinitialize: true,
        initialValues: { ...owner },
        onSubmit: async (values) => {

            setIsFormLoading(true)

            service
                .post(`/owners/${id}`, values)
                .then(response => {
                    notifyRef.current.handleShow()

                    setIsFormLoading(false)

                    setTimeout(() => {
                        router.push('/owner')
                    }, 2500)
                })
        },
        validationSchema,
    })

    if (isLoading) {
        return <Loading />
    }

    return (
        <Page title="Editar Proprietário">
            <div>
                <form className="space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Dados do Proprietário</h3>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700"> Nome </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="given-name"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={handleChange}
                                            aria-invalid={!!errors.name}
                                            defaultValue={owner.name}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        {isFormLoading && (
                            <div>Salvando...</div>
                        )}

                        {!isFormLoading && (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ () => router.push('/owner') }
                                > Voltar </button>
                                <button
                                    type="button"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ () => handleSubmit() }
                                > Salvar </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            <Notify
                title={'Sucesso!'}
                description={'Registro salvo com sucesso!'}
                ref={notifyRef}
            />
        </Page>
    )
}
