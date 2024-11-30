import { Button, Card, CardBody, CardFooter, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdExpandMore, MdMoreVert } from 'react-icons/md';
import { useOnClickOutside, useResizeObserver } from 'usehooks-ts';

interface MenuableAccordionProps {
  children: (_toggleAction?: () => void) => {
    title: ReactNode
    content: ReactNode
  },
  menu?: Record<string, () => void>
  isFocus?: boolean | undefined
  onFocusChange?: (_t: boolean) => void
}

export default function MenuableAccordion({ children, menu, isFocus, onFocusChange }: MenuableAccordionProps) {
  const [isSingleOpen, setIsLazyOpen] = useState<boolean>(false);
  const onToggleIsOpen = useCallback(() => {
    setIsLazyOpen(prev => {
      onFocusChange && onFocusChange(!prev)
      return !prev
    })
  }, [onFocusChange]);
  const cardRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside([cardRef], () => {
    typeof isFocus === 'undefined' && setIsLazyOpen(false)
  })
  useEffect(() => {
    setIsLazyOpen(typeof isFocus === 'undefined' ? false : isFocus)
  }, [isFocus])

  const isOpen = useMemo(() => {
    if (typeof isFocus === 'undefined') {
      return isSingleOpen
    } else {
      return isFocus
    }
  }, [isFocus, isSingleOpen])

  const { content: childNode, title: titleNode } = useMemo(() => {
    return children(onToggleIsOpen)
  }, [children, onToggleIsOpen])

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
        {menuItem}
      </DropdownMenu>
    </Dropdown> : <></>
  }, [menuItem])

  const contentRef = useRef<HTMLDivElement | null>(null)
  const { height } = useResizeObserver({ ref: contentRef })
  const contentHeight = useMemo(() => `calc(${height}px + 1.5rem)`, [height])

  return (
    <Card ref={(ref) => cardRef.current = ref}>
      <CardBody className="relative overflow-hidden">
        {menuCache}
        <div className="">
          {titleNode}
        </div>
        <div className={`transition-height duration-300 ease-in-out ${isOpen ? 'h-[var(--menuable-accordion-height)]' : 'h-0'}`}
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
