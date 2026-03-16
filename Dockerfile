

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src


COPY ["SebineCizkekCayEviAPİ.csproj", "./"]
RUN dotnet restore "SebineCizkekCayEviAPİ.csproj"


COPY . .
RUN dotnet build "SebineCizkekCayEviAPİ.csproj" -c Release -o /app/build
RUN dotnet publish "SebineCizkekCayEviAPİ.csproj" -c Release -o /app/publish


FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT dotnet /app/SebineCizkekCayEviAPİ.dll
