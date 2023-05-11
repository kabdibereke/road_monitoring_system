import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { VscCheck, VscArrowDown } from 'react-icons/vsc'
import styles from './Dropdown.module.scss'

interface IDropdown {
    selected:  string; 
    setSelected: React.Dispatch<React.SetStateAction< string>>;
    type: string[];
}


export default function Dropdown({selected, setSelected,type}:IDropdown) {
 
  return (
    <div className={styles.wrapper}>
      <Listbox value={selected} onChange={setSelected}>
        <div className={styles.content}>
          <Listbox.Button className={styles.btn}>
            <span className={styles.select}>{selected}</span>
            <span className={styles.icon_wrapper}>
              <VscArrowDown
                className={styles.icon}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave={styles.s1}
            leaveFrom={styles.s2}
            leaveTo={styles.s3}
          >
            <Listbox.Options className={styles.options}>
              {type.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    active? styles.active: styles.not_active
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={selected? styles.selected: styles.not_selected}
                      >
                        {person}
                      </span>
                      {selected ? (
                        <span className={styles.selected_icons_wrapper}>
                          <VscCheck className={styles.selected_icon} aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}