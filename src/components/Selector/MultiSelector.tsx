import { useEffect, useRef, useState } from "react";
import * as S from "./Selector.style";
import Arrow from "../../resources/svg/arrow";
// import { uniq } from "lodash";

export type ListItem = {
  label: string;
  value: string;
};

type Props = {
  selected?: string;
  list: ListItem[];
  placeholder: string;
  onSelected: (item: ListItem) => void;
  width?: string;
  title?: string;
  selectedItem?: ListItem[];
  setSelectedItem: (items: ListItem[]) => void;
};

const MultiSelector = ({
  selected,
  list,
  placeholder,
  onSelected,
  width,
  title,
  selectedItem = [],
  setSelectedItem,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null); //외부 클릭시 감지

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.MultiSelectorItem>
      <S.PartBox>
        <h3>{title}</h3>
        <S.SelectBox ref={selectorRef} $width={width}>
          {/* $isOpen : $ 는 스타일에서만 사용하는 property */}
          <S.ItemSelect
            $isOpen={isOpen}
            $isPlaceholder={!selected}
            onClick={handleOpen}
          >
            {selected ? selected : placeholder}
            <Arrow
              color={!selected ? "#ccc" : "#000"}
              isOpendeg={isOpen ? "180" : "0"}
            />
          </S.ItemSelect>
          {isOpen && (
            <S.ItemList>
              {list.map((item) => {
                return (
                  <li
                    key={item.label + item.value}
                    onClick={() => {
                      onSelected(item);
                      // setSelectedItem(uniq([...selectedItem, item]));
                      setSelectedItem([...selectedItem, item]);
                    }}
                  >
                    {item.label}
                  </li>
                );
              })}
            </S.ItemList>
          )}
        </S.SelectBox>
      </S.PartBox>
      <S.TagBox>
        {selectedItem.map((item, index) => (
          <span
            key={item.label + item.value + index}
            onClick={() => {
              const result = selectedItem.filter(
                (selectedItem) => selectedItem !== item
              );
              setSelectedItem(result);
            }}
          >
            {item.label}
          </span>
        ))}
      </S.TagBox>
    </S.MultiSelectorItem>
  );
};

export default MultiSelector;
