import React from 'react';
import { Text } from 'react-native';
import { Zord } from 'shared/lib/zord';
import { Container, AddressTextContainer, FlexContainer } from './styled';

interface AddressProps {
  address: any;
  type?: any;
  searchQuery: string;
  onPress: (address: any) => void;
}

export const Address: React.FC<AddressProps> = ({
  address,
  type,
  searchQuery,
  onPress,
}) => {
  const { name, street, distance } = address;

  const handleAddressPress = () => onPress(address);

  return (
    <Container onPress={handleAddressPress}>
      <AddressTextContainer>
        <FlexContainer>
          <Text>{address.title}</Text>
          <Zord marginZord={[6, 0, 0]}>
            <Text>{address.subtitle}</Text>
          </Zord>
        </FlexContainer>
      </AddressTextContainer>
    </Container>
  );
};

Address.defaultProps = {
  type: 'suggest',
};
