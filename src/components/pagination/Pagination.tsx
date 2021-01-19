import React, { useMemo } from 'react';
import styled from 'styled-components/native';

import Colors from '../../theme/Colors';
import { MediumText } from '../index';

const Base = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  padding-horizontal: 16px;
  justify-content: center;
  align-items: center;
`;

const PagesWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

type PageItemProps = {
  active: boolean;
};

const PageItem = styled.TouchableOpacity<PageItemProps>`
  background-color: ${({ active }) => (active ? Colors.PRIMARY.BLUE : Colors.BACKGROUND.WHITE)};
  border-radius: 4px;
  color: ${({ disabled }) => (disabled ? Colors.SECONDARY.GRAY : Colors.PRIMARY.BLUE)};
  padding-horizontal: 8px;
  padding-vertical: 4px;
  margin-horizontal: 4px;
`;

type PageItemTextProps = {
  active: boolean;
};

const PageItemText = styled(MediumText)<PageItemTextProps>`
  color: ${({ active }) => (active ? Colors.BACKGROUND.WHITE : Colors.SECONDARY.DARK_GRAY)};
`;

type PageControlTextProps = {
  disabled: boolean;
};

const PageControlText = styled(MediumText)<PageControlTextProps>`
  color: ${({ disabled }) => (disabled ? Colors.SECONDARY.GRAY : Colors.PRIMARY.BLUE)};
`;

const Dots = styled.TextInput`
  color: ${Colors.SECONDARY.DARK_GRAY};
`;

type PaginationProps = {
  currentPage: number;
  onPagePress: Function;
  totalPages: number;
};

// TODO: Find a smarter way for implementing classic pagination
const Pagination = ({
  currentPage,
  onPagePress,
  totalPages,
}: PaginationProps) => {
  const pagesArray = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= totalPages; i += 1) {
      arr.push(i);
    }
    return arr;
  }, [totalPages]);
  if (totalPages === 1) {
    return null;
  }

  let PagesComponent;

  if (totalPages < 6) {
    PagesComponent = (
      <PagesWrapper>
        {pagesArray.map((page) => (
          <PageItem
            active={currentPage === page}
            key={page}
            onPress={() => onPagePress(page)}
          >
            <PageItemText active={currentPage === page} text={page} />
          </PageItem>
        ))}
      </PagesWrapper>
    );
  } else if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
    PagesComponent = (
      <PagesWrapper>
        {[1, 2, 3].map((page) => (
          <PageItem
            active={page === currentPage}
            key={page}
            onPress={() => onPagePress(page)}
          >
            <PageItemText active={currentPage === page} text={page} />
          </PageItem>
        ))}
        {currentPage === 3 && (
          <PageItem active={false} key={4} onPress={() => onPagePress(4)}>
            <PageItemText active={false} text={4} />
          </PageItem>
        )}
        <Dots>...</Dots>
        <PageItem
          active={false}
          key={totalPages}
          onPress={() => onPagePress(totalPages)}
        >
          <PageItemText active={false} text={totalPages} />
        </PageItem>
      </PagesWrapper>
    );
  } else if (
    currentPage === totalPages
    || currentPage === totalPages - 1
    || currentPage === totalPages - 2
  ) {
    PagesComponent = (
      <PagesWrapper>
        <PageItem active={false} key={1} onPress={() => onPagePress(1)}>
          <PageItemText active={false} text={1} />
        </PageItem>
        <Dots>...</Dots>
        {currentPage === totalPages - 2 && (
          <PageItem
            active={false}
            key={totalPages - 3}
            onPress={() => onPagePress(totalPages - 3)}
          >
            <PageItemText active={false} text={totalPages - 3} />
          </PageItem>
        )}
        {[totalPages - 2, totalPages - 1, totalPages].map((page) => (
          <PageItem
            active={page === currentPage}
            key={page}
            onPress={() => onPagePress(page)}
          >
            <PageItemText active={page === currentPage} text={page} />
          </PageItem>
        ))}
      </PagesWrapper>
    );
  } else {
    PagesComponent = (
      <PagesWrapper>
        <PageItem active={false} key={1} onPress={() => onPagePress(1)}>
          <PageItemText active={false} text={1} />
        </PageItem>
        <Dots>...</Dots>
        {[currentPage - 1, currentPage, currentPage + 1].map((page) => (
          <PageItem
            active={page === currentPage}
            key={page}
            onPress={() => onPagePress(page)}
          >
            <PageItemText active={page === currentPage} text={page} />
          </PageItem>
        ))}
        <Dots>...</Dots>
        <PageItem
          active={false}
          key={totalPages}
          onPress={() => onPagePress(totalPages)}
        >
          <PageItemText active={false} text={totalPages} />
        </PageItem>
      </PagesWrapper>
    );
  }

  return (
    <Base>
      <PageItem
        disabled={currentPage === 1}
        active={false}
        onPress={() => onPagePress(currentPage - 1)}
      >
        <PageControlText disabled={currentPage === 1} text="Prev" />
      </PageItem>
      {PagesComponent}
      <PageItem
        disabled={currentPage === totalPages}
        active={false}
        onPress={() => onPagePress(currentPage + 1)}
      >
        <PageControlText disabled={currentPage === totalPages} text="Next" />
      </PageItem>
    </Base>
  );
};

export default Pagination;
