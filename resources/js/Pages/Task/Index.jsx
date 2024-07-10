import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import Pagination from "@/Components/Pagination";

export default function Task({ auth, tasks }) {
    const [searchQuery, setSearchQuery] = useState("");
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this task?")) {
            router.delete("/delete-task/" + id);
        }
    };

    const handleCheckboxChange = async (id, e) => {
        router.put(`/update-task/${id}/${e.target.checked}`);
    };
    // console.log(tasks);s
    const filteredTasks = tasks.data.filter(
        (task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.due_date.includes(searchQuery) ||
            task.is_completed.toString().includes(searchQuery)
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tasks
                    </h2>
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                        ></FontAwesomeIcon>
                        <TextInput
                            className="p-1"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        ></TextInput>

                        <a href={route("tasks.create")}>
                            <PrimaryButton>Create new Task</PrimaryButton>
                        </a>
                    </div>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 text-gray-900">You're logged in!</div> */}
                        {tasks.data.length > 0 ? (
                            <div>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Select
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Due Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredTasks.map((task) => (
                                            <tr
                                                key={task.id}
                                                className={
                                                    task.is_completed
                                                        ? "bg-green-50"
                                                        : "bg-white"
                                                }
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        id="is_completed"
                                                        defaultChecked={
                                                            task.is_completed
                                                        } // If task.is_completed reflects the state
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                task.id,
                                                                e
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {task.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {task.due_date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={
                                                            task.is_completed
                                                                ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                                                : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                                                        }
                                                    >
                                                        {task.is_completed
                                                            ? "Completed"
                                                            : "Pending"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                task.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination class="mt-6" links={tasks.links} />
                            </div>
                        ) : (
                            <p>No tasks found</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
