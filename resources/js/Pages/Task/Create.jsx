import React, { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        due_date: null,
    });

    // Define state for managing the selected date
    const [selectedDate, setSelectedDate] = useState(null);

    // Define handler for updating the selected date
    const handleDateChange = (date) => {
        setData('due_date', date); // Update form data with 'due_date'
        setSelectedDate(date); // Update state
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.create'), data); // Pass 'data' object to post function
    };

    return (
        <GuestLayout>
            <Head title="Create new Task" />
            <h1 className='font-semibold uppercase mb-5 text-center'>Create new Task</h1>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="task" value="Task" />

                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        placeholderText="Enter a title"
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('title', e.target.value)}
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                {/* Render date picker */}
                <div className='flex justify-center flex-1 flex-col gap-1 w-full mt-5'>
                    <InputLabel htmlFor="date" value="Due Date" />
                    <DatePicker
    id="date"
    selected={selectedDate}
    onChange={handleDateChange}
    dateFormat="yyyy-MM-dd" // Adjust date format as needed
    placeholderText='Select a date'
    className='border border-gray-300 rounded-md shadow-sm w-full block'
/>

                    <InputError message={errors.date} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Create
                    </PrimaryButton>
                </div>
            </form>

        </GuestLayout>

    );
}
