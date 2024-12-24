import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // Estado do filtro

  useEffect(() => {
    (async () => {
      const jsonValue = await AsyncStorage.getItem("@tasks");
      if (jsonValue) setTasks(JSON.parse(jsonValue));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, complete: false };
    setTasks((olds) => [...olds, newTask]);
  };

  const alterComplete = (id) => {
    setTasks((olds) =>
      olds.map((t) => (t.id === id ? { ...t, complete: !t.complete } : t))
    );
  };

  const removeTask = (id) => {
    setTasks((olds) => olds.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider value={{ tasks, addTask, alterComplete, removeTask, filter, setFilter }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
