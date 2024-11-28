import { Button, Card, CardBody, CardFooter, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { ReactNode, useMemo, useRef, useState } from 'react';
import { MdExpandMore, MdMoreVert } from 'react-icons/md';
import { useOnClickOutside, useResizeObserver } from 'usehooks-ts';

interface MenuableAccordionProps {
  children: (_toggleAction?: () => void) => {
    title: ReactNode
    content: ReactNode
  },
  menu?: Record<string, () => void>
}

export default function MenuableAccordion({ children, menu }: MenuableAccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggleIsOpen = () => {
    setIsOpen(prev => !prev)
  };
  const cardRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside([cardRef], () => {
    setIsOpen(false)
  })

  const { content: childNode, title: titleNode } = useMemo(() => {
    return children(onToggleIsOpen)
  }, [children])

  const menuItem = useMemo(() => {
    if (!menu) return []
    return Object.keys(menu).map((name, idx) => {
      return <DropdownItem key={`menu-${idx}`} onClick={menu[name]}>{name}</DropdownItem>
    })
  }, [menu])
  const menuCache = useMemo(() => {
    return menuItem.length ? <Dropdown className="absolute top-0 right-0">
      <DropdownTrigger>
        <Button isIconOnly variant="light" size="sm">
          <MdMoreVert className="w-5 h-5 text-gray-400" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown> : <></>
  }, [menuItem])

  const contentRef = useRef<HTMLDivElement | null>(null)
  const { height } = useResizeObserver({ ref: contentRef })
  const contentHeight = useMemo(() => `calc(${height}px + 1.5rem)`, [height])

  return (
    <Card ref={(ref) => cardRef.current = ref}>
      <CardBody className="relative">
        {menuCache}
        <div className="">
          {titleNode}
        </div>
        <div className={`transition-[height,opacity] duration-300 ease-in-out ${isOpen ? 'h-[var(--menuable-accordion-height)]' : 'h-0'}`}
          style={{
            '--menuable-accordion-height': contentHeight
          }}
        >
          <Divider className="my-3" />
          <div ref={(ref) => contentRef.current = ref}>
            {childNode}
          </div>
        </div>
      </CardBody>
      <CardFooter className="p-0 flex-col">
        <Divider />
        <Button
          variant="light"
          fullWidth
          onClick={onToggleIsOpen}>
          <MdExpandMore
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};
