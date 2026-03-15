
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["SebineCizkekCayEviAPI.csproj", "./"]
RUN dotnet restore "SebineCizkekCayEviAPI.csproj"


COPY . .
RUN dotnet build "SebineCizkekCayEviAPI.csproj" -c Release -o /app/build


FROM build AS publish
RUN dotnet publish "SebineCizkekCayEviAPI.csproj" -c Release -o /app/publish


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SebineCizkekCayEviAPI.dll"]