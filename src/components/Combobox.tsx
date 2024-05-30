import {
  Combobox as HeadlessCombobox,
  ComboboxButton as HeadlessComboboxButton,
  ComboboxInput as HeadlessComboboxInput,
  ComboboxOption as HeadlessComboboxOption,
  ComboboxOptions as HeadlessComboboxOptions,
  Label,
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import Fuse from 'fuse.js'
import { useState } from 'react'

type Person = { id: number; name: string }

const people: Person[] = []

for (let i = 0; i < 50000; i++) {
  people.push({
    id: i,
    name: `Name for user number ${i}`,
  })
}

export default function Combobox() {
  const [query, setQuery] = useState('')
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const fuse = new Fuse(people, {
    keys: ['name'],
  })

  const filteredPeople = fuse.search(query).map(({ item }) => item)

  return (
    <HeadlessCombobox
      as="div"
      value={selectedPerson}
      virtual={{ options: filteredPeople }}
      onChange={(person) => {
        setQuery('')
        setSelectedPerson(person)
      }}
    >
      <Label className="block font-mono text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </Label>
      <div className="relative mt-2">
        <HeadlessComboboxInput
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 font-mono text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery('')}
          displayValue={(person: Person) => person?.name}
        />
        <HeadlessComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </HeadlessComboboxButton>
        {filteredPeople.length > 0 && (
          <HeadlessComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {({ option: person }) => (
              <HeadlessComboboxOption
                key={(person as Person).id}
                value={person}
                className={({ focus }) =>
                  classNames(
                    'relative w-full cursor-default select-none py-2 pl-3 pr-9',
                    focus ? 'bg-indigo-600 text-white' : 'text-gray-900',
                  )
                }
              >
                {({ focus, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold',
                      )}
                    >
                      {(person as Person).name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          focus ? 'text-white' : 'text-indigo-600',
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </HeadlessComboboxOption>
            )}
          </HeadlessComboboxOptions>
        )}
      </div>
    </HeadlessCombobox>
  )
}
