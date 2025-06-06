import type { MenuType } from '@shared/model/menuType';
import type { ReactNode } from 'react'
import { Button, Card, CardBody, CardFooter, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useMemo, useRef, useState } from 'react';
import { MdExpandMore, MdMoreVert } from 'react-icons/md';
import { useOnClickOutside, useResizeObserver } from 'usehooks-ts';
import { BooleanRender } from '@shared/ui/StateRender';

export interface MenuableAccordionProps {
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
        <BooleanRender
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

export default MenuableAccordion