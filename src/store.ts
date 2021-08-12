import create from 'zustand'

// Standard interface and functions
export interface Todo {
  id: number
  text: string
  done: boolean
}

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }))

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }))

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id)

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
]

// zustand implementation
//  type for store content
type Store = {
  todos: Todo[]
  newTodo: string
  addTodo: () => void
  setNewTodo: (text: string) => void
  update: (id: number, text: string) => void
  toggle: (id: number) => void
  remove: (id: number) => void
  load: (todos: Todo[]) => void
}
// creating zustand store
// set is what we use to mutate/change the state
const useStore = create<Store>((set) => ({
  todos: [],
  newTodo: '',

  addTodo() {
    set((state) => ({
      ...state,
      todos: addTodo(state.todos, state.newTodo), //state.todos = initial/previous todos,  state.newTodo === new todo
      newTodo: '',
    }))
  },
  setNewTodo(text: string) {
    set((state) => ({
      ...state,
      newTodo: text,
    }))
  },
  update(id: number, text: string) {
    set((state) => ({
      ...state,
      todos: updateTodo(state.todos, id, text),
    }))
  },
  toggle(id: number) {
    set((state) => ({
      ...state,
      todos: toggleTodo(state.todos, id),
    }))
  },
  remove(id: number) {
    set((state) => ({
      ...state,
      todos: removeTodo(state.todos, id),
    }))
  },
  load(todos: Todo[]) {
    set((state) => ({
      ...state,
      todos,
    }))
  },
}))

export default useStore
