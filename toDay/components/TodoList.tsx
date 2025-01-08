import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Todo } from "./Todo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TodoType = {
    id: number;
    label: string;
    completed: boolean;
};

export type TodoListProps = {
	date: string; 
}

export const TodoList: React.FC<TodoListProps> = ({date}) => {
	// format: [{ "id": 1, "label": "todo today tada", "completed": false }]


    // get all todos as a single object
    // on todo change, change the object state
    const [todoData, setTodoData] = useState<TodoType[]>([]);

    // logging todoData
    // useEffect(() => {
    // console.log(todoData);
    // }, [todoData])

	// setting todoData to their value once app opens
	useEffect(() => {
		const getData = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem(date);
				
				// make object format into array format
				if (jsonValue != null){
					console.log(jsonValue);
					console.log(JSON.parse(jsonValue));
					setTodoData(JSON.parse(jsonValue) as (TodoType[]))
					
				}

			} catch (e) {
				console.error(e);
			}
		};
		getData();
	}, [])

	// store todoData every change 
	useEffect(() => {
		const storeData = async () => {
			// store todoData at date
			try {
				const jsonValue = JSON.stringify(todoData);
				await AsyncStorage.setItem(date, jsonValue); 
			} catch (e) {
				console.error(e);
			}

			// testing to see if it was stored
			// const getData = async () => {
			// 	try {
			// 	  const jsonValue = await AsyncStorage.getItem('20/12/2024');
			// 	  console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
			// 	} catch (e) {
			// 		console.error(e);
			// 	}
			// };
			// getData();
		}
		storeData();
	}, [todoData])

    return (
        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {todoData.map((t) => {
                return (
                    <Todo
                        key={t.id}
                        id={t.id}
                        label={t.label}
                        completed={t.completed}
                        setTodoData={setTodoData}
                    />
                );
            })}
        </View>
    );
};
