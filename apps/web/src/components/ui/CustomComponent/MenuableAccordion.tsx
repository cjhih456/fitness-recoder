import type { MenuType } from '@provider/Header/HeaderProvider';
import type { ReactNode } from 'react'
import { Button, Card, CardBody, CardFooter, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdExpandMore, MdMoreVert } from 'react-icons/md';
import { useOnClickOutside, useResizeObserver } from 'usehooks-ts';
import StateRender from '@utils/StateRender';

interface MenuableAccordionProps {
  children: (_toggleAction?: () => void) => {
    title: ReactNode
    content: ReactNode
  },
  menu?: MenuType[]
  isFocus?: boolean | undefined
  onFocusChange?: (_t: boolean) => void
}

export default function MenuableAccordion({ children, menu = [], isFocus, onFocusChange }: MenuableAccordionProps) {
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

  const contentRef = useRef<HTMLDivElement | null>(null)
  const { height } = useResizeObserver({ ref: contentRef })
  const contentHeight = useMemo(() => `calc(${height}px + 1.5rem)`, [height])

  return (
    <Card ref={(ref) => cardRef.current = ref}>
      <CardBody className="relative overflow-hidden">
        <StateRender.Boolean
          state={Boolean(menu.length)}
          render={{
            true: <Dropdown type="menu" portalContainer={cardRef.current || document.body}>
              <DropdownTrigger>
                <Button role="menu" isIconOnly variant="light" size="sm" className="absolute top-3 right-3" >
                  <MdMoreVert className="w-5 h-5 text-gray-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {menu.map((item, idx) => {
                  return <DropdownItem role="menuitem" key={`menu-${idx}`} onClick={item.action}>{item.name}</DropdownItem>
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
          <div ref={(ref) => contentRef.current = ref}>
            {childNode}
          </div>
        </figcaption>
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
