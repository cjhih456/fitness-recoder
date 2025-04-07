import type { MenuType } from '@globalUi/Header';
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { Button, Card, CardBody, CardFooter, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { MdExpandMore, MdMoreVert } from 'react-icons/md';
import { useOnClickOutside, useResizeObserver } from 'usehooks-ts';
import StateRender from '@shared/ui/StateRender';

interface MenuableAccordionProps {
  children: {
    title: ReactNode
    content: ReactNode
  },
  menu?: MenuType[]
  isOpen: boolean | undefined
  onOpenChange: (_t: boolean) => void
}

const MenuableAccordion = ({ children, menu = [], isOpen, onOpenChange }: MenuableAccordionProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside([cardRef], () => {
    isOpen && onOpenChange && onOpenChange(false)
  })

  const contentRef = useRef<HTMLDivElement | null>(null)
  const { height } = useResizeObserver({ ref: contentRef })
  const contentHeight = useMemo(() => `calc(${height}px + 1.5rem)`, [height])

  const { content: childNode, title: titleNode } = children

  return (
    <Card ref={cardRef}>
      <CardBody className="relative overflow-hidden">
        <StateRender.Boolean
          state={Boolean(menu.length)}
          render={{
            true: () => <Dropdown type="menu" portalContainer={cardRef.current || document.body}>
              <DropdownTrigger>
                <Button role="menu" isIconOnly variant="light" size="sm" className="absolute top-3 right-3" >
                  <MdMoreVert className="w-5 h-5 text-gray-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {menu.map((item, idx) => {
                  return <DropdownItem role="menuitem" key={`menu-${idx}`} onPress={item.action}>{item.name}</DropdownItem>
                })}
              </DropdownMenu>
            </Dropdown>
          }}
        />
        <figure className="">
          {titleNode}
        </figure>
        <figcaption className={`transition-height duration-300 ease-in-out ${isOpen ? 'h-[var(--menuable-accordion-height)]' : 'h-0'}`}
          style={{
            '--menuable-accordion-height': contentHeight
          }}
        >
          <Divider className="my-3" />
          <div ref={contentRef}>
            {childNode}
          </div>
        </figcaption>
      </CardBody>
      <CardFooter className="p-0 flex-col">
        <Divider />
        <Button
          variant="light"
          fullWidth
          onPress={() => onOpenChange(!isOpen)}>
          <MdExpandMore
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

const MenuableAccordionSelf = (props: Omit<MenuableAccordionProps, 'isOpen' | 'onOpenChange'>) => {
  const [isOpen, setIsOpen] = useState(false)
  return <MenuableAccordion {...props} onOpenChange={setIsOpen} isOpen={isOpen} />
}
MenuableAccordion.Self = MenuableAccordionSelf

const Context = createContext<[any, Dispatch<SetStateAction<any>>]>([0, () => { }])
interface MenuableAccordionGroupProviderProps {
  defaultValue?: number
  children: ReactNode
}
const MenuableAccordionGroupProvider = ({ defaultValue = 0, children }: MenuableAccordionGroupProviderProps) => {
  const providerState = useState(defaultValue)
  return <Context.Provider value={providerState}>{children}</Context.Provider>
}
const MenuableAccordionGroupContent = ({ openId, ...props }: Omit<MenuableAccordionProps, 'isOpen' | 'onOpenChange'> & { openId: any }) => {
  const [state, setState] = useContext(Context)
  const isOpen = useMemo(() => state === openId, [state, openId])
  const setIsOpen = useCallback((v: boolean) => {
    setState(v ? openId : null)
  }, [setState, openId])
  return <MenuableAccordion {...props} onOpenChange={setIsOpen} isOpen={isOpen} />
}
MenuableAccordion.GroupProvider = MenuableAccordionGroupProvider
MenuableAccordion.GroupContent = MenuableAccordionGroupContent

export default MenuableAccordion