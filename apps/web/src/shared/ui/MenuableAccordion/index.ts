import MenuableAccordion from './MenuableAccordion'
import { MenuableAccordionGroupProvider, MenuableAccordionGroupContent } from './MenuableAccordionGroup'

export type { MenuableAccordionProps } from './MenuableAccordion'
export default Object.assign(MenuableAccordion, {
  GroupProvider: MenuableAccordionGroupProvider,
  GroupContent: MenuableAccordionGroupContent
})