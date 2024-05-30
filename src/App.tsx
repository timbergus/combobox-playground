import Combobox from './components/Combobox'

export const App = () => {
  return (
    <div className="m-auto mt-40 grid w-96 gap-3 rounded-lg bg-gray-300 px-4 py-8">
      <p className="font-mono text-lg">
        Virtualization example with HeadlessUI and 50000 elements.
      </p>
      <Combobox />
    </div>
  )
}
