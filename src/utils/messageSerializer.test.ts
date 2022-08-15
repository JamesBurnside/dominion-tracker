import { DominionPlayer } from '@types';
import { deserializePlayers, serializePlayers } from './messageSerializer';

function createMockPlayer(
  sName: string,
  fName: string,
  cards: Array<[string, number]> | undefined
): DominionPlayer {
  return {
    shortName: sName,
    fullName: fName,
    deck: new Map(cards),
  };
}

describe('message serializer/deserializer tests', () => {
  test('serialize players should serialize correctly, and then deserialize correctly', () => {
    // Arrange
    const player1 = createMockPlayer('p1', 'player1', [
      ['Copper', 7],
      ['Estate', 3],
    ]);
    const player2 = createMockPlayer('p2', 'player1', undefined);
    const players = [player1, player2];

    // Act
    const serializedPlayers = serializePlayers(players);

    // Assert
    expect(serializedPlayers).toMatchInlineSnapshot(
      `"[{\\"shortName\\":\\"p1\\",\\"fullName\\":\\"player1\\",\\"deck\\":{\\"dataType\\":\\"Map\\",\\"value\\":[[\\"Copper\\",7],[\\"Estate\\",3]]}},{\\"shortName\\":\\"p2\\",\\"fullName\\":\\"player1\\",\\"deck\\":{\\"dataType\\":\\"Map\\",\\"value\\":[]}}]"`
    );

    // Act again
    const deserializedPlayers = deserializePlayers(serializedPlayers);

    // Assert again
    expect(deserializedPlayers).toEqual(players);
  });

  test('serialize players should not break on an empty set of players', () => {
    // Arrange
    const players: DominionPlayer[] = [];

    // Act
    const serializedPlayers = serializePlayers(players);

    // Assert
    expect(serializedPlayers).toMatchInlineSnapshot(`"[]"`);

    // Act again
    const deserializedPlayers = deserializePlayers(serializedPlayers);

    // Assert again
    expect(deserializedPlayers).toEqual(players);
  });
});
