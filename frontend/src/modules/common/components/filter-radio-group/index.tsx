import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title?: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex gap-x-3 flex-col gap-y-3">
      {title && <Text className="txt-compact-small-plus text-ui-fg-muted">{title}</Text>}
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        {items?.map((i) => {
          const isActive = i.value === value
          return (
            <div
              key={i.value}
              className="flex items-center gap-x-2 relative"
            >
              {isActive && (
                <div className="absolute left-[-20px] w-1.5 h-1.5 rounded-full bg-ui-fg-base" />
              )}
              <RadioGroup.Item
                checked={isActive}
                className="hidden peer"
                id={i.value}
                value={i.value}
              />
              <Label
                htmlFor={i.value}
                className={clx(
                  "!txt-compact-small !transform-none hover:cursor-pointer custom-link",
                  {
                    "!text-ui-fg-base": isActive,
                    "text-ui-fg-subtle": !isActive,
                  }
                )}
                data-testid="radio-label"
                data-active={isActive}
              >
                {i.label}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
