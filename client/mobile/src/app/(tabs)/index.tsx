import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://192.168.0.104:3000",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <IndexPage />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const IndexPage = () => {
  const { data: users, refetch: refetchUsers } = trpc.user.users.useQuery();
  const { mutate: createUser } = trpc.user.create.useMutation({
    onSuccess: () => {
      refetchUsers();
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>bill-splitter</Text>
      <Button
        onPress={() =>
          createUser({
            email: "test_user",
            name: "Test User",
          })
        }
        title="Create test user"
      />
      {users &&
        users.map((user) => (
          <Text key={user.id}>
            {user.id} {user.name} {user.email}
          </Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
