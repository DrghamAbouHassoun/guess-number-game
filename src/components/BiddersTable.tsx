"use client";
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { Table } from 'flowbite-react';
import React from 'react'

const BiddersTable = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { botPlayers, currentPoints, biddingMultiplier, biddingPoints } = useAppSelector((state: RootState) => state.game);

  const players = [{ name: user.name, points: currentPoints, biddingMultiplier, biddingPoints }, ...botPlayers]

  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Index</Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Lst Bid</Table.HeadCell>
        <Table.HeadCell>Points</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {players.map((item, index) => (
          <Table.Row key={index}>
            <Table.Cell>{index}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.biddingMultiplier}</Table.Cell>
            <Table.Cell>{item.points}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default BiddersTable