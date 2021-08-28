import React, { useState, useRef } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"
import InputMask from 'react-input-mask'

import Page from '../../components/page'
import Notify from '../../components/notify'

import { parseBirthMonthToDatabase } from '../../helpers/cow.helper'

import { OWNERS } from '../../lib/mock'

export default function New() {

    const notifyRef = useRef()

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const validationSchema = Yup.object().shape({
        gender: Yup.string().required('Required'),
        birthMonth: Yup.string().required('Required')
    })

    const {handleChange, handleSubmit, errors, values} = useFormik({
        initialValues: {
            gender: 'female',
            birthMonth: '',
            ownerId: null
        },
        onSubmit: async (values) => {
            setLoading(true)

            if (!/^\d{2}\/\d{4}$/.test(values.birthMonth)) {
                return console.error('invalid date', values.birthMonth)
            }

            values.birthMonth = parseBirthMonthToDatabase(values.birthMonth)

            console.log('values', values)

            notifyRef.current.handleShow()
        },
        validationSchema,
    })

    return (
        <Page title="Nova Vaca">
            <div>
                <form className="space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Dados da Vaca</h3>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700">
                                        Proprietário
                                    </label>
                                    <select
                                        id="ownerId"
                                        name="ownerId"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                        aria-invalid={!!errors.ownerId}
                                    >
                                        {OWNERS.map(owner => (
                                            <option key={owner.id} value={owner.id}>{owner.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                        Gênero
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                        aria-invalid={!!errors.gender}
                                    >
                                        <option value={'female'}>Feminino</option>
                                        <option value={'male'}>Masculino</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="birthMonth" className="block text-sm font-medium text-gray-700"> Mês de Nascimento </label>
                                    <div className="mt-1">
                                        <InputMask mask="99/9999" onChange={handleChange}>
                                            {(inputProps) => (
                                                <input
                                                    type="text"
                                                    name="birthMonth"
                                                    id="birthMonth"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    {...inputProps}
                                                    onChange={handleChange}
                                                    aria-invalid={!!errors.birthMonth}
                                                />
                                            )}
                                        </InputMask>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={ () => router.push('/cow') }
                            > Cancelar </button>
                            <button
                                type="button"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={ () => handleSubmit() }
                            > Salvar </button>
                        </div>
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